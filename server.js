require('dotenv').config();
const config = require('./config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Forcer la définition du JWT_SECRET dans process.env
process.env.JWT_SECRET = config.jwtSecret;

// Définir le port
const PORT = config.port;

console.log('\n=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('Current working directory:', process.cwd());
console.log('JWT_SECRET exists:', !!config.jwtSecret);
console.log('MONGO_URI exists:', !!config.mongoUri);
console.log('SENDGRID_API_KEY exists:', !!config.sendgridApiKey);
console.log('SENDGRID_FROM_EMAIL exists:', !!config.sendgridFromEmail);
console.log('NODE_ENV:', config.nodeEnv);
console.log('===============================\n');

// Validate required environment variables
const requiredEnvs = ['MONGO_URI', 'JWT_SECRET'];
let missingEnvs = false;
requiredEnvs.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Environment variable ${key} is required but not set`);
    missingEnvs = true;
  } else {
    console.log(`✓ Environment variable ${key} is set`);
  }
});

if (missingEnvs) {
  console.error('❌ Missing required environment variables. Exiting...');
  process.exit(1);
}

const app = express();

// CORS configuration
const corsOptions = {
  origin: (incomingOrigin, callback) => {
    // Autoriser explicitement localhost et vos domaines prod
    const whitelist = [
      'https://sahar-frontend.vercel.app',
      'https://sahar-frontend-g5vdy3jb6-hellomyworld123s-projects.vercel.app',
      'http://localhost:3000'
    ];

    // ✅ 1) Si l'origin est absent (undefined) → on laisse passer
    if (!incomingOrigin) {
      console.log('CORS: origine undefined autorisée');
      return callback(null, true);
    }

    // ✅ 2) Domains whitelistés ou n'importe quel *.vercel.app
    if (
      whitelist.includes(incomingOrigin) ||
      /\.vercel\.app$/.test(incomingOrigin)
    ) {
      console.log('CORS autorisé pour:', incomingOrigin);
      return callback(null, true);
    }

    // ❌ 3) Tout le reste est bloqué
    console.error('CORS bloqué pour:', incomingOrigin);
    callback(new Error(`CORS bloqué pour l'origine: ${incomingOrigin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.disable('x-powered-by');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Sahar Nail Care API',
    apiUrl: 'https://sahar-backend.onrender.com',
    status: 'online',
    environment: config.nodeEnv
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservations', require('./routes/reservations'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue',
    error: config.nodeEnv === 'development' ? err.message : undefined
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Create default admin user
const createDefaultAdmin = async () => {
  const adminEmail = 'admin@sahar.com';
  const adminPassword = 'sahar2024';

  // Hasher systématiquement le mot de passe
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert : met à jour si trouvé, sinon crée
  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      role: 'admin'
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('🛡️ Admin initialisé →', adminEmail, '/', adminPassword);
};

// Call createDefaultAdmin after MongoDB connection
connectDB().then(async () => {
  await createDefaultAdmin();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log('API URL: https://sahar-backend.onrender.com');
    console.log('Environment:', config.nodeEnv);
  });
});

// Export the Express app
module.exports = app;
