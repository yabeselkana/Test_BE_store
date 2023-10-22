const response = (res, result, status, message, pagination, role) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  resultPrint.role = role;
  res.status(status).json(resultPrint);
};

const responseSisa = (res, result, status, message, Sisa) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.Sisa = Sisa;
  res.status(status).json(resultPrint);
};

const responseCapacity = (res, result, status, message, capacity, Sisa) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.limit_product = capacity;
  resultPrint.Sisa_Capacity = Sisa;
  res.status(status).json(resultPrint);
};

module.exports = { response, responseSisa, responseCapacity };
