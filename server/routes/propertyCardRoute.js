import express from 'express';
import PropertyCard from '../models/propertyCardModel.js';
import Auth from '../middleware/auth.js';


const router = express.Router();
//Retrieve All Property Card IDs
router.get('/getIds', async (req, res) => {
  try {
    const propertyCardIds = await PropertyCard.find({}, '_id');
    res.json(propertyCardIds);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving property card IDs', error });
  }
});
// Retrieve Property Cards
router.get('/', async (req, res) => {
  try {
    const propertyCards = await PropertyCard.find();
    res.json(propertyCards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving property cards', error });
  }
});

// Retrieve a Single Property Card by ID
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const propertyCard = await PropertyCard.findById(req.params.id);
    if (!propertyCard) return res.status(404).json({ message: 'Property card not found' });
    res.json(propertyCard);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving property card', error });
  }
});

// Create Property Card
router.post('/', Auth.authenticateToken, async (req, res) => {
  const { community, building, unitNo } = req.body;
  const propertyCard = new PropertyCard({ community, building, unitNo });
  try {
    await propertyCard.save();
    res.status(201).json({ message: 'Property card created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property card', error });
  }
});

// Update Property Card
router.put('/:id', Auth.authenticateToken, async (req, res) => {


  const { community, building, unitNo } = req.body;

  try {
    const propertyCard = await PropertyCard.findByIdAndUpdate(req.params.id, { community, building, unitNo }, { new: true });
    if (!propertyCard) return res.status(404).json({ message: 'Property card not found' });

    res.json({ message: 'Property card updated successfully', propertyCard });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property card', error });
  }
});

// Delete Property Card
router.delete('/:id', Auth.authenticateToken, async (req, res) => {

  try {
    const propertyCard = await PropertyCard.findByIdAndDelete(req.params.id);
    if (!propertyCard) return res.status(404).json({ message: 'Property card not found' });

    res.json({ message: 'Property card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property card', error });
  }
});



export default router;

