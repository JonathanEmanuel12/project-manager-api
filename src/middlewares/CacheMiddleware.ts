import { Request, Response, NextFunction } from 'express'
import { RedisService } from '../services/RedisService'

export function cacheMiddleware(expSeconds = 600) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const method = req.method
        const baseUrl = req.path
        const sortedQuery = getSortedQueryString(req.query)
        const cacheKey = `${method}-${baseUrl}?${sortedQuery}`

        const cachedData = await RedisService.get(cacheKey)

        if (cachedData) {
            console.log(`Cache key: ${cacheKey}`)
            return res.status(200).json(JSON.parse(cachedData))
        }

        const originalJson = res.json.bind(res)
        res.json = (body: any) => {
            RedisService.save(cacheKey, JSON.stringify(body), expSeconds)
                .catch(err => console.error('Erro ao salvar no Redis:', err))
            return originalJson(body)
        }

        next()
    }

    function getSortedQueryString(query: any): string {
        const sortedEntries = Object.entries(query)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`)
        return sortedEntries.join('&')
    }

}
