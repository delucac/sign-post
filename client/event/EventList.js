import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'

export default function EventList (props) {
    return (
      <div style={{marginTop: '24px'}}>
        {props.events.map((item, i) => {
            return <Event event={item} key={i} onRemove={props.removeUpdate}/>
          })
        }
      </div>
    )
}
EventList.propTypes = {
  events: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
