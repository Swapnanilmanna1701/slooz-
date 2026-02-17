"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('password123', 10);
    const manager = await prisma.user.create({
        data: {
            email: 'manager@slooz.com',
            password: hashedPassword,
            name: 'Alice Johnson',
            role: 'MANAGER',
        },
    });
    const storeKeeper = await prisma.user.create({
        data: {
            email: 'keeper@slooz.com',
            password: hashedPassword,
            name: 'Bob Smith',
            role: 'STORE_KEEPER',
        },
    });
    console.log('Users created:', { manager: manager.email, storeKeeper: storeKeeper.email });
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Arabica Coffee Beans',
                description: 'Premium single-origin Arabica coffee beans from Ethiopia',
                sku: 'COM-COF-001',
                category: 'Beverages',
                price: 24.99,
                quantity: 150,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Organic Basmati Rice',
                description: 'Long-grain organic Basmati rice from India',
                sku: 'COM-RIC-001',
                category: 'Grains',
                price: 8.5,
                quantity: 500,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Extra Virgin Olive Oil',
                description: 'Cold-pressed extra virgin olive oil from Spain',
                sku: 'COM-OIL-001',
                category: 'Oils',
                price: 18.75,
                quantity: 200,
                unit: 'liters',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Refined Sugar',
                description: 'White refined sugar for commercial use',
                sku: 'COM-SUG-001',
                category: 'Sweeteners',
                price: 3.25,
                quantity: 1000,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Whole Wheat Flour',
                description: 'Stone-ground whole wheat flour',
                sku: 'COM-FLR-001',
                category: 'Grains',
                price: 4.5,
                quantity: 800,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Saffron Threads',
                description: 'Premium Grade A saffron threads from Iran',
                sku: 'COM-SAF-001',
                category: 'Spices',
                price: 299.99,
                quantity: 5,
                unit: 'grams',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Black Pepper Whole',
                description: 'Tellicherry black peppercorns',
                sku: 'COM-PEP-001',
                category: 'Spices',
                price: 15.0,
                quantity: 120,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Raw Honey',
                description: 'Unprocessed wildflower honey',
                sku: 'COM-HON-001',
                category: 'Sweeteners',
                price: 12.99,
                quantity: 75,
                unit: 'liters',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Cocoa Powder',
                description: 'Dutch-processed premium cocoa powder',
                sku: 'COM-COC-001',
                category: 'Beverages',
                price: 22.0,
                quantity: 60,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Himalayan Pink Salt',
                description: 'Mined from Khewra salt mine, Pakistan',
                sku: 'COM-SAL-001',
                category: 'Spices',
                price: 6.75,
                quantity: 3,
                unit: 'kg',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Sunflower Oil',
                description: 'Refined sunflower cooking oil',
                sku: 'COM-OIL-002',
                category: 'Oils',
                price: 7.25,
                quantity: 350,
                unit: 'liters',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Green Tea Leaves',
                description: 'Premium Japanese Sencha green tea',
                sku: 'COM-TEA-001',
                category: 'Beverages',
                price: 34.5,
                quantity: 45,
                unit: 'kg',
            },
        }),
    ]);
    console.log(`Created ${products.length} products`);
    console.log('\nSeed completed successfully!');
    console.log('\nSample Login Credentials:');
    console.log('  Manager:      manager@slooz.com / password123');
    console.log('  Store Keeper: keeper@slooz.com  / password123');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map