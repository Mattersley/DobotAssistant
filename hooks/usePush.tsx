import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useRef, useState } from 'react'

const usePush = (): NextRouter['push'] => {
  const router = useRouter()
  const routerRef = useRef(router)

  routerRef.current = router

  const [{ push }] = useState<Pick<NextRouter, 'push'>>({
    push: (path) => routerRef.current.push(path),
  })
  return push
}

export default usePush
