const handlerBase = {
  onError: (err, _, res) => {
    res.status(500).end();
  },
  onNoMatch: (_, res) => {
    res.status(404).end();
  },
};

export default handlerBase;
