import { ranking } from "../repository/ranking.repository.js";

export async function getRanking(req, res) {
    try {
        const rankingGet = await ranking();
        const rankingData = rankingGet.rows

        const rankingResponse = rankingData.map((row) => ({
            id: row.id,
            name: row.name,
            linksCount: row.linksCount,
            visitCount: row.visitCount
        }))

        return res.status(200).send(rankingResponse);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}