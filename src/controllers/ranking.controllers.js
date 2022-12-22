import { ranking } from "../repository/ranking.repository.js";

export async function getRanking(req, res) {
    try {
        const rankingGet = await ranking();
        const rankingData = rankingGet.rows

        const rankingResponse = rankingData.map((row) => ({
            id: row.id,
            name: row.name,
            linksCount: row.linksCount,
            visitCount: row.visitCount === null ? "0" : row.visitCount
          }))
    
          return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}