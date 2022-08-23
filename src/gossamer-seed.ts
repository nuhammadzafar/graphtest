import {
Transfer as TransferEvent ,
GossamerSeed as GossamerSeedContract
} from  "../generated/GossamerSeed/GossamerSeed";

import { Ape, User } from "../generated/schema";

export function handleTransfer(event:TransferEvent) : void 
{
  let ape = Ape.load(event.params.tokenId.toString());
  if (!ape)
  {
    ape = new Ape (event.params.tokenId.toString());
    ape.creator=event.params.to.toHexString();
    ape.createdAtTimestamp=event.block.timestamp;
    let apeContract = GossamerSeedContract.bind(event.address);
    ape.contentURI = apeContract.tokenURI(event.params.tokenId);
  }
  ape.owner = event.params.to.toHexString();
  ape.save();
  let user = User.load(event.params.to.toHexString());
  if(!user)
  {
    let user = new User(event.params.to.toHexString());
    user.save();
  }

}
