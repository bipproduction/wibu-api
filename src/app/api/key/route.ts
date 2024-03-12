
import { NextRequest } from "next/server";
import prisma from "@/_lib/prisma";

export async function GET(req: NextRequest) {
    const header = req.headers.get("authorization");
    if (!header) return Response.json({success: false, message: "Unauthorized"}, { status: 401 });
    const key = header.split(" ")[1];
    if (!key) return Response.json({success: false, message: "Unauthorized"}, { status: 401 });
    const api = await prisma.apiKey.findUnique({
        where: {
            key: key,
        },
        select: {
            name: true,
            key: true,
            isActive: true,
            expiresAt: true,
            ApikeyConfig: {
                select: {
                    config: {
                        select: {
                            name: true,
                            description: true,
                            value: true
                        }
                    }
                }
            }
        }
    })
    if (!api) return Response.json({success: false, message: "Unauthorized"}, { status: 401 });
    if (!api.isActive) return Response.json({success: false, message: "Unauthorized"}, { status: 401 });
    if (api.expiresAt && api.expiresAt < new Date()) return Response.json({success: false, message: "Unauthorized"}, { status: 401 });
    return Response.json(api.ApikeyConfig.map((v) => v.config), { status: 200 });
}