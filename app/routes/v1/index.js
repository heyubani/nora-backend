/* eslint-disable  */
import { Router } from 'express';
import * as Controller from '../../controllers';
import Model from '../../middlewares/index.model'
import Schema from '../../utils/schema';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', code: 200, message: 'We outside!' });
});


router.post('/beads', 
Model(Schema.addBeads, 'payload'),
Controller.addBeads);

router.get('/beads', 
Controller.fetchAllBeads);

router.delete('/beads/:bead_id', 
Model(Schema.beadId, 'params'),
Controller.deleteBeadById);

router.post('/beads/order/:bead_id', 
Model(Schema.createBeadOrder, 'payload'),
Controller.beadOrder);

router.get('/beads/order', 
Controller.fetchAllBeadOrder);

router.get('/beads/order/:order_id', 
Model(Schema.orderId, 'params'),
Controller.fetchSingleBeadOrder);

router.delete('/beads/order/:order_id', 
Model(Schema.orderId, 'params'),
Controller.deleteBeadOrderById);

router.patch('/beads/order/:order_id', 
Model(Schema.editQty, 'payload'),
Controller.updateOrderQty);



export default router;
