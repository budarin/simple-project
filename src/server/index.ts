import Fastify from 'fastify';

const fastify = Fastify({
    logger: { prettyPrint: true },
});

fastify.get('/', async function () {
    return { hello: 'world!!' };
});

fastify.listen(3000, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
