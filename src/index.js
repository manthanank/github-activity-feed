const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { fetchGitHubActivity } = require('./services/githubService');
const { PORT, GITHUB_USERNAME } = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const updateGitHubActivity = async () => {
    try {
        const activity = await fetchGitHubActivity(GITHUB_USERNAME);
        io.emit('github activity', activity);
    } catch (error) {
        console.error('Error updating GitHub activity:', error);
    }
};

setInterval(updateGitHubActivity, 60000); // Fetch activity every 60 seconds

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
