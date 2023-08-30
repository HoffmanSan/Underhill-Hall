// imports
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default function EventClassic() {
    const { type, eventId } = useParams();

  return (
    <div>

    </div>
  )
}
