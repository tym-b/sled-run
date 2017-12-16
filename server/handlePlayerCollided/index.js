const handlePlayerCollided = (io) => ({ type }) => {
  io.to(type).emit('detectedCollision');
};

export default handlePlayerCollided;
