// https://viacep.com.br/ws/79560000/json


import React from "react";

import axios from "axios";

const api = axios.create({
    baseURL:'https://viacep.com.br/ws/'
})

export default api