import React from 'react'
import PropTypes from 'prop-types'
import Place from './Place'

export default function PlaceList (props) {
    return (
      <div style={{marginTop: '24px'}}>
        {props.places.map((item, i) => {
            return <Place place={item} key={i} onRemove={props.removeUpdate}/>
          })
        }
      </div>
    )
}
PlaceList.propTypes = {
  places: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
