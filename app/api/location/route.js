import { connect } from "../../models/db.js";
import ownerModel from "../../models/owner.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      await connect();
      const owners = await ownerModel.find({},'latitude longitude'); // Fetch all owner records
      return NextResponse.json(owners, { status: 200 });
    } catch (error) {
      console.error("Error fetching owner data:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
