const axios = require('axios');

const fetchGitHubActivity = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        throw error;
    }
};

module.exports = { fetchGitHubActivity };
