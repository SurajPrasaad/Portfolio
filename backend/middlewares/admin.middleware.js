
export const adminMiddleware = (request, response, next) => {
  if (request.user && request.user.role === 'admin') {
    next();
  } else {
    response.status(403).json({ message: 'Access denied, admin only' });
  }
};
