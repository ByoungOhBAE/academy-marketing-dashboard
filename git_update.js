#!/usr/bin/env node
const { execSync } = require('child_process');

function gitUpdate(message = '자동 업데이트') {
  try {
    console.log('📦 Git 상태 확인 중...');
    
    // Git 상태 확인
    const status = execSync('git status --short', { encoding: 'utf-8' });
    
    if (!status.trim()) {
      console.log('✅ 변경사항이 없습니다.');
      return;
    }
    
    console.log('변경된 파일:');
    console.log(status);
    
    // 변경사항 추가
    console.log('📝 변경사항 추가 중...');
    execSync('git add .', { stdio: 'inherit' });
    
    // 커밋
    const commitMessage = process.argv[2] || message;
    console.log(`💾 커밋 중: "${commitMessage}"`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // 푸시
    console.log('🚀 GitHub에 푸시 중...');
    execSync('git push origin master', { stdio: 'inherit' });
    
    console.log('✅ Git 업데이트 완료!');
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

gitUpdate();
