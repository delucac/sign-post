const create = async (params, credentials, event) => {
  try {
    let response = await fetch('/api/events/new/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: event
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listByUserEvent = async (params, credentials) => {
  try {
    let response = await fetch('/api/events/by/'+ params.userId, {
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
    let response = await fetch('/api/events/feed/'+ params.userId, {
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
    let response = await fetch('/api/events/' + params.eventId, {
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


const like = async (params, credentials, eventId) => {
  try {
    let response = await fetch('/api/events/like/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, eventId: eventId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const unlike = async (params, credentials, eventId) => {
  try {
    let response = await fetch('/api/events/unlike/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, eventId: eventId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const comment = async (params, credentials, eventId, comment) => {
  try {
    let response = await fetch('/api/events/comment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, eventId: eventId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const uncomment = async (params, credentials, eventId, comment) => {
  try {
    let response = await fetch('/api/events/uncomment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, eventId: eventId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


export {
  listNewsFeed,
  listByUserEvent,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment
}
