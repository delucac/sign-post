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

const listByUserPlace = async (params, credentials) => {
  try {
    let response = await fetch('/api/places/by/'+ params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/places/feed/'+ params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/places/' + params.placeId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const like = async (params, credentials, placeId) => {
  try {
    let response = await fetch('/api/places/like/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, placeId: placeId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const unlike = async (params, credentials, placeId) => {
  try {
    let response = await fetch('/api/places/unlike/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, placeId: placeId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const comment = async (params, credentials, placeId, comment) => {
  try {
    let response = await fetch('/api/places/comment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, placeId: placeId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const uncomment = async (params, credentials, placeId, comment) => {
  try {
    let response = await fetch('/api/places/uncomment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, placeId: placeId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


export {
  listNewsFeed,
  listByUserPlace,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment
}
