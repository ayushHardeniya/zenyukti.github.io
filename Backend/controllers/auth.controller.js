import jwt from 'jsonwebtoken';

export const googleAuthSuccess = (req, res) => {
  console.log('🔍 googleAuthSuccess called');
  console.log('🔍 req.user exists:', !!req.user);
  
  try {
    if (!req.user) {
      console.log('❌ No user in req.user, redirecting with error');
      const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
      return res.redirect(`${frontendURL}/#/login?error=auth_failed`);
    }

    console.log('🔍 User data:', {
      id: req.user._id || req.user.id,
      email: req.user.email,
      name: req.user.name,
      photo: req.user.photo || req.user.picture
    });

    const tokenPayload = { 
      id: req.user._id || req.user.id,
      userId: req.user._id || req.user.id,
      email: req.user.email,
      name: req.user.name,
      photo: req.user.photo || req.user.picture,
      provider: req.user.provider || 'google'
    };

    console.log('🔍 Token payload:', tokenPayload);

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    console.log('🔍 Token created successfully, length:', token.length);

    // UPDATED: Use hash routing for frontend URL
    const frontendURL =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || "https://zenyukti.github.io"
        : "http://localhost:5173";

    // CHANGED: Add # before /auth/callback for HashRouter
    const redirectUrl = `${frontendURL}/#/auth/callback?token=${token}`;
    console.log('🔍 Redirect URL:', redirectUrl);

    res.redirect(redirectUrl);

  } catch (error) {
    console.error("❌ Error in googleAuthSuccess:", error);
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/#/login?error=server_error`);
  }
};

export const logoutUser = (req, res) => {
  console.log('🔍 logoutUser called');
  req.logout(() => {
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    console.log('🔍 Logout redirect to:', frontendURL);
    res.redirect(`${frontendURL}/#/`); // Add # for HashRouter
  });
};