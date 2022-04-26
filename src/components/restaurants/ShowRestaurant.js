import React, { useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'

import { useParams, useNavigate} from 'react-router-dom'



const style = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap'
}

const ShowRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        getOneRestaurant(id)
            .then((res)=> {
                console.log(res.data.product)
                setRestaurant(res.data.restaurant)
            })
            .catch(err => console.log(err))
    }, [])
}