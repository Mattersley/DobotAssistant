import {
  useContext, useEffect, useRef, useState,
} from 'react'
import { format } from 'date-fns'
import * as turf from '@turf/helpers'
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import mapboxgl from '!mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import classes from './Map.module.css'

import { OrderContext } from '../../../context/OrderContext/orderContext'
import { DeliveryDateContext } from '../../../context/DeliveryDateContext/deliveryDateContext'
import { isValidDate } from '../../../shared/helper'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const { ordersByDeliveryDate, routeInfo } = useContext(OrderContext)
  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)
  const mapContainer = useRef(null)
  const map: React.MutableRefObject<mapboxgl> = useRef(null)
  const [carLocation, setCarLocation] = useState([0, 0])
  const [warehouseLocation, setWarehouseLocation] = useState([0, 0])
  const [zoom, setZoom] = useState(11)

  const warehouse = turf.featureCollection([turf.point(warehouseLocation)])
  const dropoffs = turf.featureCollection([])
  const nothing = turf.featureCollection([])

  // Initialize Map
  useEffect(() => {
    if (map.current) return // initialize map only once

    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: carLocation,
      zoom,
    })
  }, [carLocation, zoom])

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    const marker = document.createElement('div')
    marker.className = classes.car
    new mapboxgl.Marker(marker).setLngLat(carLocation).addTo(map.current)

    map.current?.on('load', () => {
      map.current?.addLayer({
        id: 'warehouse',
        type: 'circle',
        source: {
          data: warehouse,
          type: 'geojson',
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'white',
          'circle-stroke-color': '#800080',
          'circle-stroke-width': 3,
        },
      })

      map.current?.addLayer({
        id: 'dropoffs-symbol',
        type: 'circle',
        source: {
          data: dropoffs,
          type: 'geojson',
        },
        paint: {
          'circle-radius': 2,
          'circle-stroke-color': '#800080',
          'circle-stroke-width': 1,
        },
      })

      map.current?.addLayer({
        id: 'dropoffs-text',
        type: 'symbol',
        source: {
          data: dropoffs,
          type: 'geojson',
        },
        layout: {
          'text-field': ['get', 'orderNumber'],
          'text-font': [
            'Open Sans Regular',
            'Arial Unicode MS Regular',
          ],
          'text-offset': [2, 0],
          'text-anchor': 'top',
          'text-size': ['interpolate', ['linear'], ['zoom'], 8, 12, 10, 12],
        },
        paint: {
          'text-color': '#800080',
        },
      })

      map.current?.addSource('route', {
        type: 'geojson',
        data: nothing,
      })

      map.current?.addLayer(
        {
          id: 'routeline-active',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#CC99CC',
            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
          },
        },
        'waterway-label',
      )

      map.current?.addLayer(
        {
          id: 'routearrows',
          type: 'symbol',
          source: 'route',
          layout: {
            'symbol-placement': 'line',
            'text-field': '▶',
            'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
            'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
            'text-keep-upright': false,
          },
          paint: {
            'text-color': '#CC99CC',
          },
        },
        'waterway-label',
      )

      map.current?.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true,
        }),
      )
    })
  }, [carLocation, dropoffs, nothing, warehouse])

  // Make GeoJSON Array for Deliveries
  useEffect(() => {
    if (ordersByDeliveryDate && nextDeliveryDateFromMaster !== undefined && isValidDate(nextDeliveryDateFromMaster)) {
      const ordersForNextDeliveryDate = ordersByDeliveryDate[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]
      if (ordersForNextDeliveryDate) {
        Object.values(ordersForNextDeliveryDate).forEach((order) => {
          if (order.coordinates) {
            const crdArr = String(order.coordinates).split(',')
            const pt = turf.point([Number(crdArr[0]), Number(crdArr[1])], {
              orderNumber: order.id,
              key: Math.random(),
            })
            dropoffs.features.push(pt)
          }
        })
        if (dropoffs && dropoffs.features.length > 0) {
          map.current?.getSource('dropoffs-symbol').setData(dropoffs)
          map.current?.getSource('dropoffs-text').setData(dropoffs)
        }
      }
    }
  }, [dropoffs, nextDeliveryDateFromMaster, ordersByDeliveryDate])

  useEffect(() => {
    if (routeInfo && routeInfo?.[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]) {
      const routeGeoJSON = turf.featureCollection([
        turf.feature(routeInfo[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')].trips[0].geometry),
      ])
      map.current?.getSource('route').setData(routeGeoJSON)
    }
  }, [nextDeliveryDateFromMaster, routeInfo])

  return (
    <div className="mx-auto my-8 h-full w-full">
      <div ref={mapContainer} style={{ borderRadius: '1rem', height: '80%', width: '100%' }} />
    </div>
  )
}

export default Map
