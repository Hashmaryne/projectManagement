import express from 'express';
import Lead from '../models/leadModel.js';
import PropertyCard from '../models/propertyCardModel.js';
import Auth from '../middleware/auth.js';

const router = express.Router();

// Create Lead
router.post('/', Auth.authenticateToken, async (req, res) => {
  const { name, email, propertyCardIds } = req.body;
  const lead = new Lead({ name, email, user: req.user.id, propertyCards: propertyCardIds });

  try {
    await lead.save();
    await PropertyCard.updateMany(
      { _id: { $in: propertyCardIds } },
      { $push: { leads: lead._id } }
    );
    res.status(201).json({ message: 'Lead created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lead', error });
  }
});

// Update Lead
router.put('/:id', Auth.authenticateToken, async (req, res) => {
  const { name, email, propertyCardIds } = req.body;

  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { name, email, propertyCards: propertyCardIds }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    res.json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error });
  }
});

// Delete Lead
router.delete('/:id', Auth.authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    await PropertyCard.updateMany(
      { _id: { $in: lead.propertyCards } },
      { $pull: { leads: lead._id } }
    );

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error });
  }
});

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lead', error });
  }
});

// Retrieve Leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().populate('propertyCards');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leads', error });
  }
});

export default router;

