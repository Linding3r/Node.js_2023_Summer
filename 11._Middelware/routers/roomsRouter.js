import {Router} from 'express';

const router = Router();

//middleware
function butler(req, res, next) {
    console.log('Welcome to the mansion', req.ip);
    next();
}

//butler is the middleware
router.get('/room', butler, (req, res, next) => {
    console.log('Room 1');
    //next();
    res.send({ data: 'This is room 1' });
});

// middleware function set in the line instead of seperate function
router.get(
    '/room',
    (req, res, next) => {
        console.log('Welcome to this exclusive room');
        next();
    },
    (req, res, next) => {
        console.log('Room 2');
        //next();
        res.send({ data: 'This is room 2' });
    }
);

router.get('/room/1', (req, res, next) => {
    console.log('Room 1');
    next();
    res.send({ data: 'Unknown room' });
});

router.get('/room/*', (req, res, next) => {
    //next();
    res.send({ data: 'Unknown room' });
});


export default router;