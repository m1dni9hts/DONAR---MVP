const {Router} = require('express')
const router = Router();

const { storeTask } = require('../controller/agendamentoController');

router.post('/store/task', storeTask);
// router.get('/get/task', getTask);

module.exports = router;