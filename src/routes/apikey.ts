import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { createHmac, randomBytes } from "crypto";
// import { supabase } from "supabase";
// import { verifyAuth } from "../middleware/authMiddleware";

const router: Router = express.Router();

// 🟢 Generate API Key with Salt
router.post("/generate-api-key",async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        // Check if the user already has an active API key
        // const { data: existingApiKey, error: existingError } = await supabase
        //     .from("api_keys")
        //     .select("apiKey, status")
        //     .eq("userId", userId)
        //     .eq("status", "active")
        //     .single();

        // if (existingError) {
        //     console.error("Error checking existing API key:", existingError);
        //     res.status(500).json({ message: "Internal server error" });
        // }

        // // Return existing active API key if present
        // if (existingApiKey) {
        //     res.status(200).json({
        //         apiKey: existingApiKey.apiKey,
        //         message: "Existing active API key found.",
        //     });
        // }

        // Generate a new salt
        const salt = randomBytes(16).toString("hex");

        // Create a new API key using userId + salt + SECRET_KEY
        const apiKey = createHmac("sha256", process.env.API_KEY_SECRET!)
            .update(userId + salt)
            .digest("hex");

        // Store the new API key and salt in the database
        // const { error: insertError } = await supabase.from("api_keys").insert({
        //     userId,
        //     apiKey,
        //     salt,
        //     status: "active",
        // });

        // if (insertError) {
        //     console.error("Error saving new API key:", insertError);
        //     res.status(500).json({ message: "Internal server error" });
        // }

        res.status(201).json({
            apiKey,
            message: "API key generated successfully.",
        });
    } catch (error) {
        console.error("Error generating API key:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🔴 Revoke API Key
router.post("/revoke-api-key",async (req: Request, res: Response) => {
    try {
        const { userId, apiKey } = req.body;

        // Update the API key status to 'revoked' in the database
        // const { error: updateError } = await supabase
        //     .from("api_keys")
        //     .update({ status: "revoked" })
        //     .eq("userId", userId)
        //     .eq("apiKey", apiKey)
        //     .eq("status", "active");

        // if (updateError) {
        //     console.error("Error revoking API key:", updateError);
        //     res.status(500).json({ message: "Internal server error" });
        // }

        res.status(200).json({ message: "API key revoked successfully." });
    } catch (error) {
        console.error("Error revoking API key:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;

