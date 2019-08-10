pragma solidity ^0.4.23;
	
contract Farmer {
    
	//Contract between the Farmer and the processing House to agree on the the Lot created & sent by the Farmer.
	//"FMRID0001","LOTID0002","ok"
	//"FMRID0001","LOTID0002"
	//"FMRID0001","LOTID0002","PHID0002","ok"
	
	//variables declaration
	enum AssetState { ContractCreated, AssetCreated, TransfertoPH, LotApprovedbyPH, LotRejectedbyPH, AcceptedRejectedlotCompleted }

    AssetState public state;
    address public  farmer;
    address public  processingHouse;
    address public  warehouse;
    address public  distributor;
    string public farmerID;
	string public lotID;
    string public phID;
    bool public present;    
    address public processor;
    
    modifier isFarmer() {
        require(msg.sender == farmer);
        _;
    }

    modifier isProcessingHouse() {
        require(msg.sender == processingHouse);
        _;
    }	
	
    modifier isWarehouse() {
        require(msg.sender == warehouse);
        _;
    }

    modifier isDistributor() {
        require(msg.sender == distributor);
        _;
    }	
	
	//struct declaration for handling the PHLot details
	struct farmerStruct {
		string farmerID;
		string phID;
		mapping(string => lotStruct) lotIDnum;
	}
		
	mapping(string => farmerStruct) farmerIDnum;

	//struct declaration for handling the WHLot details
	struct lotStruct {
		string lotID;
		uint state;
		string reason;
	}		   
	
	//constructor creation for farmer contract - called when Farmer initiates transaction by creating lotID
	constructor () public {
        state = AssetState.ContractCreated;
    }      
	
	//Warehouse creates lotIDnum	
	function createAsset(string _farmerIDnum, string _lotIDnum, string _reason) public{
		farmerIDnum[_farmerIDnum].farmerID = _farmerIDnum;
		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state = uint(AssetState.AssetCreated);

		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].lotID = _lotIDnum;									
		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].reason = _reason;			

	}

	//Warehouse creates lotIDnum	
	function transferAsset(string _farmerIDnum, string _lotIDnum, string _phID, string _reason) public{
		farmerIDnum[_farmerIDnum].farmerID = _farmerIDnum;
		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state = uint(AssetState.TransfertoPH);
		farmerIDnum[_farmerIDnum].phID = _phID;

		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].lotID = _lotIDnum;									
		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].reason = _reason;			

	}

		//ProcessingHouse receives the lotID sent by the farmer after auditing
	function phreceiveLot(string _farmerIDnum, string _lotIDnum) public {        

		if (uint(AssetState.TransfertoPH) != 2) {
			revert();
		}			
        
        //Once agreed by the processingHouse, the new contract gets created which involves the life cycle of product including the ProcessingHouse/ Distributor/ Food service operator
				
        farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state = uint(AssetState.LotApprovedbyPH);
		state = AssetState.LotApprovedbyPH;
		
    }    	
	//ProcessingHouse rejects the lot sent by the farmer in case if the quality of the meat is not good
	
	function phrejectLot(string _farmerIDnum, string _lotIDnum) public {        

		if (uint(AssetState.TransfertoPH) != 2) {
			revert();
		}
		farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state = uint(AssetState.LotRejectedbyPH);			
        state = AssetState.LotRejectedbyPH;
    }    	

	
	//anyone can read the lotIDnum
	function readsAsset(string _farmerIDnum, string _lotIDnum) public returns (string, string, uint,string,string) {
		return (farmerIDnum[_farmerIDnum].farmerID,farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].lotID,farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state,farmerIDnum[_farmerIDnum].phID,farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].reason);
	}	

	
		//anyone can read the lotIDnum
	function readAsset(string _farmerIDnum, string _lotIDnum) public returns (uint) {
		return (farmerIDnum[_farmerIDnum].lotIDnum[_lotIDnum].state);
	}	


	function getTarget(string _farmerIDnum) public returns (string) {
		return (farmerIDnum[_farmerIDnum].phID);
	}		
}