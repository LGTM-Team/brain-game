import { useState } from 'react';
import { supabase } from '@/api/service/supabase/supabase'; // 경로에 맞게 수정

interface UseUpdateNicknameReturn {
  updateNickname: (newNickname: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useUpdateNickname = (): UseUpdateNicknameReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const updateNickname = async (newNickname: string): Promise<boolean> => {
    if (!newNickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ nickname: newNickname.trim() })
        .eq('id', userData.user.id);

      if (updateError) {
        // 중복 닉네임 처리
        if (
          updateError.code === '23505' ||
          (updateError.message && updateError.message.includes('duplicate key value'))
        ) {
          setError('이미 존재하는 닉네임입니다.');
        } else {
          setError(updateError.message || '닉네임 수정에 실패했습니다.');
        }
        return false;
      }

      return true;
    } catch (err: any) {
      const fallback = '닉네임 수정에 실패했습니다.';
      if (err.code === '23505' || (err.message && err.message.includes('duplicate key value'))) {
        setError('이미 존재하는 닉네임입니다.');
      } else if (err instanceof Error) {
        setError(err.message || fallback);
      } else {
        setError(fallback);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateNickname,
    isLoading,
    error,
    clearError,
  };
};
