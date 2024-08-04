import { createServer } from 'node:http';

const app = createServer((req, res) => {
    res.write('Hello world')

    if(req.url === '/ok'){
        res.write('ok')
        return res.end()

    }

 return res.end()

});

app.listen(3001);
