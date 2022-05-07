function _throw(e) {
  e.code = 406
  throw e
}

export async function find(model, filter) {
  try {
    return await model.find(filter).lean()
  } catch(e) {
    _throw(e)
  }
}

export async function create(model, data) {
  try {
    return await model.create(data)
  } catch(e) {
    _throw(e)
  }
}

export async function update(model, filter, data, options) {
  try {
    return await model.updateOne(filter, data, options)
  } catch(e) {
    _throw(e)
  }
}

export async function remove(model, filter) {
  try {
    return await model.deleteOne(filter)
  } catch(e) {
    _throw(e)
  }
}