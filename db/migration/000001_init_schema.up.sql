CREATE TABLE counters (
  id SERIAL PRIMARY KEY,
  count integer NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
