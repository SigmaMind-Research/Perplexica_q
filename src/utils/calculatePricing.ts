import db from '../db';
import { modelPricing,webSearchPricing} from '../db/schema';
import { eq } from 'drizzle-orm';

export async function calculatePricing(model: string, inputTokens: number, outputTokens: number) {
    try {
      // Fetch model pricing from the database
      const pricing = await db.query.modelPricing.findFirst({
        where: eq(modelPricing.modelName,model),
      });
      if (!pricing) throw new Error(`Pricing not found for model: ${model}`);
  
      // Pricing details (from DB)
      const inputPrice = pricing.inputTokenPrice || 0;
      const outputPrice = pricing.outputTokenPrice || 0;
  
      // Convert tokens to cost (dividing by 10^6 to normalize pricing)
      const inputCost = (inputTokens / 1000000) * Number(inputPrice);
      const outputCost = (outputTokens / 1000000) * Number(outputPrice);
      
      const webPricing = await db
        .select({ price: webSearchPricing.pricePerSearch })  // Select only pricePerSearch with alias "price"
        .from(webSearchPricing)
        .limit(1);
      const totalCost = inputCost + outputCost + Number(webPricing[0].price);
      return totalCost;
    } catch (error) {
      console.error("Error calculating pricing:", error);
      return 0;
    }
  }
  