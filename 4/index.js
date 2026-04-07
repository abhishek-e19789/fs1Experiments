import express from 'express';

const app = express();
app.use(express.json());

// Playing Crads Experiment
const cards = [
    {id:1, suit:"hearts", value:"queen", collection:"royal"},
    {id:2, suit:"spades", value:"ace", collection:"royal"},
    {id:3, suit:"clubs", value:"10", collection:"vindagd"},
    {id:4, suit:"diamonds", value:"2", collection:"vindagd"}
];

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
});

app.get('/api/v1/all-cards', (req, res) => {
  res.status(200).json(cards);
});

app.get('/api/v1/cards/:collection', (req, res) => {
  const { collection } = req.params;
  const filteredCards = cards.filter(card => card.collection === collection);
  res.status(200).json(filteredCards);
});

app.post('/api/v1/cards', (req, res) => {
  const { suit, value, collection } = req.body;
  const newCard = {
    id: cards.length + 1,
    suit,
    value,
    collection
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});


app.delete('/api/v1/cards/:id', (req, res) => {
  const { id } = req.params;
  const cardIndex = cards.findIndex(card => card.id === parseInt(id));
  if (cardIndex !== -1) {
    const deletedCard = cards.splice(cardIndex, 1);
    res.status(200).json(deletedCard[0]);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});
// Concurrent Ticket Booking Experiment
let seats = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  status: "available",
  lockedBy: null,
  lockExpiry: null
}));

// Lock a seat
app.post("/lock-seat", (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats.find(s => s.id === seatId);

  if (!seat) return res.status(404).send({ message: "Seat not found" });
  if (seat.status !== "available") return res.status(400).send({ message: "Seat not available" });

  seat.status = "locked";
  seat.lockedBy = userId;
  seat.lockExpiry = Date.now() + 2 * 60 * 1000; // 2 min lock

  res.send({ message: "Seat locked", seat });
});

// Confirm booking
app.post("/confirm-seat", (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats.find(s => s.id === seatId);

  if (!seat || seat.lockedBy !== userId) return res.status(400).send({ message: "Invalid lock" });
  if (Date.now() > seat.lockExpiry) {
    seat.status = "available";
    seat.lockedBy = null;
    return res.status(400).send({ message: "Lock expired" });
  }

  seat.status = "booked";
  seat.lockedBy = null;
  seat.lockExpiry = null;

  res.send({ message: "Seat booked successfully", seat });
});

// Release seat
app.post("/release-seat", (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats.find(s => s.id === seatId);

  if (!seat || seat.lockedBy !== userId) return res.status(400).send({ message: "Invalid release" });

  seat.status = "available";
  seat.lockedBy = null;
  seat.lockExpiry = null;

  res.send({ message: "Seat released", seat });
});

// Get all seats
app.get("/seats", (req, res) => {
  // Auto-expire locks
  seats.forEach(seat => {
    if (seat.status === "locked" && Date.now() > seat.lockExpiry) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockExpiry = null;
    }
  });
  res.send(seats);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});