pragma solidity ^0.5.8;

contract FarmerInterface {
  function readAsset(string memory _farmerIDnum, string memory _lotIDnum)
    view
    public
    returns (uint)
    {}
}

contract Processor{

	//Variables declaration
	enum AssetsState { ContractCreated, AssetCreated, AssetTransferred, AssetApproved, AssetRejected, AssetRecall, Completed }

    AssetsState public state;	

    address public  farmer;
    address public  processingHouse;  
	address public  warehouse;  
	address public  distributor;  
    string public farmerID;
	string public phID;
	string public lotID;	
	string public fmr_farmerID;
	string public fmr_lotID;
	uint public fmr_state;
	string public fmr_phID;
	string public fmr_reason;
	address farmeraddress;
	uint public assetread;
	
	FarmerInterface private exampleContract;
	
    //farmerContract fmr;
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
	struct phStruct {
		string PHLotID;
		mapping(string => commonstruct) userID;
		mapping(string => whStruct) lotIDWH;
	}
		
	mapping(string => phStruct) lotIDPH;

	//struct declaration for handling the WHLot details
	struct whStruct {
		string whlotID;	
		uint stateWH;
        string reasonWH;
		mapping(string => distStruct) lotIDDist;        
	}		

	//struct declaration for handling the WHLot details
	struct distStruct {
		string caselotID;	
		uint stateDist;
		string targetID;
        string reasonDist;		
	}	
	
	struct commonstruct {
		string userIDnum;
		uint state;
		string targetID;
		uint timeIn;
		uint timeOut;
		uint templotID;
		string reason;	
	}

	constructor (address _farmerCntrtAddress) public {
	farmeraddress = _farmerCntrtAddress;
	exampleContract = FarmerInterface(farmeraddress);
        state = AssetsState.ContractCreated;
    }      

	/*function readAsset(string memory _farmerIDnum, string memory _lotIDnum) public returns (uint) {
	    Farmer contractOne = Farmer(farmeraddress);
		contractOne.readAsset(_farmerIDnum,_lotIDnum);
		return (fmr_farmerID,fmr_lotID,fmr_state,fmr_phID,fmr_reason);
	}	*/
	
	//Warehouse creates lotIDWH	
	function createAsset(string memory _lotIDPH, string memory _userID, string memory _reason) public{
		lotIDPH[_lotIDPH].PHLotID = _lotIDPH;
		lotIDPH[_lotIDPH].userID[_userID].userIDnum = _userID;	
		lotIDPH[_lotIDPH].userID[_userID].state = uint(AssetsState.AssetCreated);
		lotIDPH[_lotIDPH].userID[_userID].reason = _reason;	
	}

	//Warehouse creates lotIDWH	
	function transferAsset(string memory _lotIDPH, string memory _userID, string memory _targetID) public{
		//lotIDPH[_lotIDPH].state = uint(AssetsState.TransfertoPH);
		lotIDPH[_lotIDPH].userID[_userID].targetID = _targetID;
		lotIDPH[_lotIDPH].userID[_userID].state = uint(AssetsState.AssetTransferred);
	}

   function createWhAsset(string memory _lotIDPH, string memory _lotIDWH) public{
		lotIDPH[_lotIDPH].PHLotID = _lotIDPH;
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].whlotID = _lotIDWH;	
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH = uint(AssetsState.AssetCreated);
		//lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].reasonWH = _reason;
		
   }

	//Warehouse creates lotIDWH	
	function transferWhAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _targetID) public{
		//lotIDPH[_lotIDPH].state = uint(AssetsState.TransfertoPH);
		if (uint(lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH) == 5) {
			revert();
		}			
		lotIDPH[_lotIDPH].userID[_lotIDWH].targetID = _targetID;
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH = uint(AssetsState.AssetTransferred);
	}

	//Warehouse recall lotIDWH	
	function recallWhAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _reason) public{
		//lotIDPH[_lotIDPH].state = uint(AssetsState.TransfertoPH)
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH = uint(AssetsState.AssetRecall);
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].reasonWH = _reason;
	}	
	
	function readWhAsset(string memory _lotIDPH, string memory _lotIDWH) public returns (uint) {
		return (lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH);
	}	

		//ProcessingHouse receives the lotID sent by the farmer after auditing
	function whreceiveLot(string memory _lotIDPH, string memory _userID) public {        

		if (uint(lotIDPH[_lotIDPH].userID[_userID].state) != 2) {
			revert();
		}			
        
        //Once agreed by the processingHouse, the new contract gets created which involves the life cycle of product including the ProcessingHouse/ Distributor/ Food service operator
				
       lotIDPH[_lotIDPH].userID[_userID].state  = uint(AssetsState.AssetApproved);
	
		
    }    	
	//ProcessingHouse rejects the lot sent by the farmer in case if the quality of the meat is not good
	
	function whrejectLot(string memory _lotIDPH, string memory _userID) public {        

		if (uint(lotIDPH[_lotIDPH].userID[_userID].state) != 2) {
			revert();
		}
		 lotIDPH[_lotIDPH].userID[_userID].state  = uint(AssetsState.AssetRejected);			
        
    }    	
	
	//anyone can read the lotIDWH
	function processReadAsset(string memory _lotIDPH, string memory _userID) public returns (string memory, string memory, uint, string memory, string memory) {
		return (lotIDPH[_lotIDPH].PHLotID,lotIDPH[_lotIDPH].userID[_userID].userIDnum,lotIDPH[_lotIDPH].userID[_userID].state,lotIDPH[_lotIDPH].userID[_userID].targetID,lotIDPH[_lotIDPH].userID[_userID].reason);
	}	
	
	function processState(string memory _lotIDPH, string memory _userID) public returns (uint) {
		return (lotIDPH[_lotIDPH].userID[_userID].state);
	}	

/*	function readAsset(string memory _farmerIDnum, string memory _lotIDnum) public returns (bool) {
		assetread = exampleContract.readAsset(_farmerIDnum, _lotIDnum);
		return true;
	}		*/
//distributor starts	
   function createDistAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist) public{
		lotIDPH[_lotIDPH].PHLotID = _lotIDPH;
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].caselotID = _lotIDWH;	
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist = uint(AssetsState.AssetCreated);
		//lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].reasonWH = _reason;
		
   }

	//Warehouse creates lotIDWH	
	function transferDistAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist, string memory _targetID) public{
		//lotIDPH[_lotIDPH].state = uint(AssetsState.TransfertoPH);
		if (uint(lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist) == 5) {
			revert();
		}			
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].targetID = _targetID;
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist = uint(AssetsState.AssetTransferred);
	}

	//Warehouse recall lotIDWH	
	function recallDistAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist, string memory _reason) public{
		//lotIDPH[_lotIDPH].state = uint(AssetsState.TransfertoPH)
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist = uint(AssetsState.AssetRecall);
		lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].reasonDist = _reason;
	}	
	
/*	function readWhAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist) public returns (uint) {
		return (lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist);
	}	*/

		//ProcessingHouse receives the lotID sent by the farmer after auditing
	function distreceiveLot(string memory _lotIDPH, string memory _lotIDWH) public {        

		if (uint(lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH) != 2) {
			revert();
		}			
        
        //Once agreed by the processingHouse, the new contract gets created which involves the life cycle of product including the ProcessingHouse/ Distributor/ Food service operator
				
       lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH  = uint(AssetsState.AssetApproved);
	
		
    }    	
	//ProcessingHouse rejects the lot sent by the farmer in case if the quality of the meat is not good
	
	function distrejectLot(string memory _lotIDPH, string memory _lotIDWH) public {        

		if (uint(lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH) != 2) {
			revert();
		}
		 lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].stateWH  = uint(AssetsState.AssetRejected);			
        
    }    	
	
	//anyone can read the lotIDWH
	function distReadAsset(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist) public returns (string memory, string memory, uint, string memory) {
		return (lotIDPH[_lotIDPH].PHLotID,lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].caselotID,lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist,lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].targetID);
	}	
	
	function distState(string memory _lotIDPH, string memory _lotIDWH, string memory _lotIDDist) public returns (uint) {
		return (lotIDPH[_lotIDPH].lotIDWH[_lotIDWH].lotIDDist[_lotIDDist].stateDist);
	}		
	
}
