import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const response = await axios.get("api/test");
      setData(response.data);
    })();
  }, []);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return <div>{data}</div>;
};

export default Test;
