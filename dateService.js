const express = require('express');
const bodyParser = require('body-parser');
const { DateTime } = require('luxon');

const app = express();
app.use(bodyParser.json());

app.post('/date-difference', (req, res) => {
  const { date1, date2 } = req.body;

  if (!date1 || !date2) {
    return res.status(400).json({ error: 'Missing date parameters.' });
  }

  const date1Obj = DateTime.fromISO(date1, { zone: 'utc' }).startOf('day');
  const date2Obj = DateTime.fromISO(date2, { zone: 'utc' }).startOf('day');

  if (!date1Obj.isValid || !date2Obj.isValid) {
    return res.status(400).json({ error: 'Invalid date format. Please use the format "YYYY-MM-DD". date1'+date1+'date2'+date2 });
  }

  const difference = Math.abs(date2Obj.diff(date1Obj, 'days').days);
  res.json({ difference });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
