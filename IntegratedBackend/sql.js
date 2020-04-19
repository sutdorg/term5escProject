const sqlAgentSet =
    "SET @jid_a = ?;\
     SET @NumOfCus = ?;\
     SET @AvailStatus = ?;\
     CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";

const sqlAgentAvailSet =
    "SET @jid_a = ?;\
     SET @AvailStatus = ?;\
     CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";

const sqlAgentCreate =
    "SET @AgentID = ?;\
     SET @Skill1 = ?;\
     SET @Skill2 = ?;\
     SET @Skill3 = ?;\
     SET @Name = ?;\
     SET @AvailStatus = ?;\
     SET @NumOfCus = ?;\
     SET @jid_a =?; \
     CALL CREATEAGENT(@AgentID,@Skill1,@Skill2,@Skill3,@Name,@AvailStatus,@NumOfCus,@jid_a);";

const sqlCusAgent =
    "SET @idUpcomingCall = ?;\
     SET @jid_a = ?;\
     SET @jid_c = ?;\
     SET @FirstName = ?;\
     SET @LastName = ?;\
     SET @StrID = ?;\
     SET @TimeRegistered = ?; \
     CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c,@FirstName,@LastName,@StrID,@TimeRegistered);";

const sqlOngoingCall =
    "SET @CALLID = ?;\
     SET @jid_a = ?;\
     SET @jid_c = ?;\
     SET @FirstName = ?;\
     SET @LastName = ?;\
     SET @StrID = ?;\
     SET @TimeRegistered = ?;\
     CALL ONGOING(@CALLID,@jid_a,@jid_c,@FirstName,@LastName,@StrID,@TimeRegistered)";

const sqlAgent =
    "SET @AgentID = ?;\
     SET @AvailStatus = ?;\
     SET @NumOfCus = ?;\
     CALL AGENTSTATUS(@AgentID,@AvailStatus,@NumOfCus);";

const sqlEditEntry =
    "SET @CustomerID = ?;\
     SET @FirstName = ?;\
     SET @LastName = ?;\
     SET @StrID = ?;\
     SET @JID_IM =?;\
     SET @Skill = ?;\
     CALL EDITENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";

const sqlReroute =
    "SET @CustomerID = ?;\
     SET @FirstName = ?;\
     SET @LastName = ?;\
     SET @StrID = ?;\
     SET @JID_IM =?;\
     SET @Skill = ?;\
     SET @TimeRegistered = ?;\
     CALL REROUTE(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill,@TimeRegistered);";

module.exports = {
    sqlAgent,
    sqlAgentSet,
    sqlAgentAvailSet,
    sqlAgentCreate,
    sqlOngoingCall,
    sqlEditEntry,
    sqlReroute,
    sqlCusAgent
};