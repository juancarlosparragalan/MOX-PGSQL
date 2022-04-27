    //connectionString = 'postgres://postgres:123456@146.190.229.79:5432/odoo14',
    //client = new pg.Client(connectionString),
    const {
        Client
    } = require('pg');
    const fs = require('fs');
    const client = new Client({
            user: 'postgres',
            host: '146.190.229.79',
            database: 'odoo14',
            password: '123456789',
            port: 5432,
        }),
        queryAll = 'SELECT * FROM leads;';

    const {
        NodeSSH
    } = require('node-ssh')

connector = {
    host: '146.190.229.79',
    username: 'root',
    privateKey: fs.readFileSync('./keyFile.pem', 'utf8')
}

    const ssh = new NodeSSH()

    async function queryer() {
        ssh.connect({
            host: '146.190.229.79',
            username: 'root',
            privateKey: fs.readFileSync('./keyFile.pem', 'utf8')
        }).then(function () {

            return ssh.execCommand('psql -U postgres -d odoo14 -c "SELECT * FROM leads;"').then(function (result) {
                console.log('STDOUT: ' + result.stdout)
                console.log('STDERR: ' + result.stderr)
            });
        })
    }
    /*
        async function queryer() {
            //client.connect();

            console.log('Connected to postgres!...');

            client.connect(function (err) {
                if (err) {
                    console.log('error: ', err);
                    throw err;
                }
                console.log("Connected!");
            });

            try {
                var query = await client.query(queryAll);
                console.log('query: ', query);
                client.end();
                return query;
            } catch (error) {
                console.log(error);
            }
            /*
            query.on('row', function (row,result) {
                result.addRow(row);
                return result;
            });*/

    //}
    module.exports = {
        queryer: queryer,
        async consulter(){
            let query = await queryer();
            if (!query) {
                console.log('error: read query');
            }
            console.log('query: ', query);
            return query;
        }
    };