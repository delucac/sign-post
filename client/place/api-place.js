const create = async (params, credentials, place) => {
  try {
    let response = await fetch('/api/places/new/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: place
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create
}
