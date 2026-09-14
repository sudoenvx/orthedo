import "dotenv/config";

import { runSeeders } from "./seeders";
import { disconnect, prisma } from "../src";

async function main() {
    await runSeeders(prisma);
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await disconnect();
    });