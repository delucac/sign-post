import React from 'react'
import PropTypes from 'prop-types'
import Agent from './Agent'

export default function AgentList (props) {
    return (
      <div style={{marginTop: '24px'}}>
        {props.agents.map((item, i) => {
            return <Agent agent={item} key={i} onRemove={props.removeUpdate}/>
          })
        }
      </div>
    )
}
AgentList.propTypes = {
  agents: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
