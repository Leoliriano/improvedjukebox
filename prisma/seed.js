const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    try {
        const user1 = {
            username: "JamesCena",
            password: await bcrypt.hash("Cantseeme2005", 10) 
        };

        const user2 = {
            username: "EliManning",
            password: await bcrypt.hash("NYGiants2012", 10) 
        };

        const user3 = {
            username: "MikeTyson",
            password: await bcrypt.hash("Earbite90", 10) 
        };

        const createdUser1 = await prisma.user.create({
            data: user1
        });

        const createdUser2 = await prisma.user.create({
            data: user2
        });

        const createdUser3 = await prisma.user.create({
            data: user3
        });

        const posts = [
            {
                title: "No Mistakes",
                content: "It is possible to commit no mistakes and still lose. That is not weakness, that is life.",
                userId: createdUser1.id,
            },
            {
                title: "Guilty Conscience",
                content: "Garak was right about one thing: a guilty conscience is a small price to pay for the safety of the Alpha quadrant.",
                userId: createdUser2.id,
            },
            {
                title: "Revenge Isn't the Answer",
                content: "Our First Instinct Is To Seek Revenge When Those Who We Love Are Taken From Us. But That's Not Who We Are..",
                userId: createdUser3.id,
            },
        ];

        for (const post of posts) {
            await prisma.post.create({ data: post });
        }

        console.log("Finished seeding/creating posts!");
    } catch (error) {
        console.error('Uh Oh, something went wrong...', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
