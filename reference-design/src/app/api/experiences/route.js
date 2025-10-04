import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://techico:<Wkm20150117>@cluster0.zubauvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('Magico-Portfolio'); // change this
    const collection = db.collection('coco-experience');
    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  } finally {
    await client.close();
  }
}
