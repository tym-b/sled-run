const handleGameConnected = (game, id) => () => (game.client = id);

module.exports = handleGameConnected;
