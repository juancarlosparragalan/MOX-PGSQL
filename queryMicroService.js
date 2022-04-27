var db = require('./dbconnector');

module.exports = {
    async consulta() {
        let query = await db.queryer();
        if (!query) {
            console.log('error: read query');
        }
        console.log('query: ', query);
        return query;
    }
};