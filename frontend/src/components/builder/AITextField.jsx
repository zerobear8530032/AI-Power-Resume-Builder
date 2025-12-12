import React, { useState, useEffect } from 'react';

function AITextField({ value = {}, onChange ,placeHolder }) {
    const [showAIResponse, setShowAIResponse] = useState(false);
    const [userText, setUserText] = useState(value.userText || "");
    const [aiText, setAiText] = useState(value.aiText || "");
    const [loading, setLoading] = useState(false);

    // Sync when parent changes values
    useEffect(() => {
        setUserText(value.userText || "");
        setAiText(value.aiText || "");
    }, [value]);

    const sendRequestToAi = async () => {
        setLoading(true);
        // Fake delay
        await new Promise(res => setTimeout(res, 2000));
        const optimized = "optimized text goes here";
        setAiText(optimized);
        // Send BOTH values back
        onChange({
            userText,
            aiText: optimized
        });

        setShowAIResponse(true);
        setLoading(false);
    };

    const handleUserChange = (e) => {
        const newUserText = e.target.value;
        setUserText(newUserText);

        // Send BOTH values back
        onChange({
            userText: newUserText,
            aiText
        });
    };

    return (
        <div className="space-y-4">
            {/* Loading Indicator - Styled with animation */}
            {loading && (
                <div className='bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 flex items-center gap-3'>
                    <span className='text-2xl animate-spin'>⚙️</span>
                    <div>
                        <p className='text-purple-300 font-semibold'>AI is optimizing your content...</p>
                        <p className='text-purple-400 text-sm'>This may take a few seconds</p>
                    </div>
                </div>
            )}

            {/* Content Display Area */}
            <div className='space-y-2'>
                {showAIResponse ? (
                    // AI Content View
                    <>
                        <div className='flex items-center justify-between'>
                            <label className='block text-sm font-medium text-gray-300'>
                                AI-Optimized Content
                            </label>
                            <span className='text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-700/50'>
                                ✨ AI Enhanced
                            </span>
                        </div>
                        <textarea
                            value={aiText}
                            readOnly
                            rows={6}
                            className='w-full px-4 py-3 bg-gray-700/50 border border-purple-600/50 rounded-lg text-gray-100 cursor-not-allowed resize-none'
                            placeholder='AI-optimized content will appear here...'
                        />
                        <p className='text-xs text-gray-400 flex items-center gap-1'>
                            💡 This is the AI-enhanced version. Click "Show Original" to edit.
                        </p>
                    </>
                ) : (
                    // User Content View
                    <>
                        <div className='flex items-center justify-between'>
                            <label className='block text-sm font-medium text-gray-300'>
                                Your Original Content
                            </label>
                            <span className='text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded border border-blue-700/50'>
                                ✍️ Original
                            </span>
                        </div>
                        <textarea
                            value={userText}
                            onChange={handleUserChange}
                            rows={6}
                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                            placeholder={placeHolder || 'Enter your description here...'}
                        />
                    </>

                )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3'>
                <button
                    type='button'
                    onClick={() => setShowAIResponse(prev => !prev)}
                    disabled={loading}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${loading
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                        }`}
                >
                    {showAIResponse ? (
                        <>
                            <span>✍️</span>
                            Show Original
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            Show AI Content
                        </>
                    )}
                </button>

                <button
                    type='button'
                    onClick={sendRequestToAi}
                    disabled={loading || !userText.trim()}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${loading || !userText.trim()
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                        }`}
                >
                    {loading ? (
                        <>
                            <span className='animate-spin'>⏳</span>
                            Optimizing...
                        </>
                    ) : (
                        <>
                            <span>🚀</span>
                            Optimize with AI
                        </>
                    )}
                </button>
            </div>

            {/* Helper Text - Added for better UX */}
            {!userText.trim() && !loading && (
                <p className='text-xs text-yellow-400 flex items-center gap-1 bg-yellow-900/20 border border-yellow-700/50 rounded p-2'>
                    <span>⚠️</span>
                    Enter some content first to use AI optimization
                </p>
            )}
        </div>
    );
}

export default AITextField